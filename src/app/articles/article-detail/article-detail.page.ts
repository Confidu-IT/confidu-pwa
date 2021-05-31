import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage {
  public user: any;
  public result: any;
  public isLoading: boolean;
  public socials = {
    facebook: true,
    twitter: true,
    mail: true
  };
  public slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 12
  };
  public params: any;
  private subscription: Subscription;
  private readonly routeSub: Subscription;


  constructor(
    public userAuth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private commonService: CommonService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        if (!user) {
          return this.router.navigateByUrl('/');
        }
        this.user = user;
        if (this.params.type === 'magazine') {
          return this.commonService.getArticleById(this.user.ma, this.params.id);
        } else if (this.params.type === 'recipe') {
          return this.commonService.getRecipeById(this.user.ma, this.params.id);
        }
      })
    ).subscribe(article => {
      if (!article) {
        return this.router.navigateByUrl('/');
      }
      console.log('article', article);
      this.result = article;
      this.isLoading = false;
    });
  }

  public onClickArticle(id: string): void {
    this.router.navigateByUrl(`article/magazine/${id}`);
  }

  public onCalculateRation(link: string, label: string): void {
    const uri = `/tickets/ticket/${link}/${label}/questions`;
    console.log(uri);
    this.router.navigateByUrl(uri);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
