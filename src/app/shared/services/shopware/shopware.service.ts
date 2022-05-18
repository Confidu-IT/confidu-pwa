import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopwareService {
  private cartState$ = new BehaviorSubject<boolean>(null);
  private baseUrl = environment.baseUrl;
  private uri: string

  public get browserLang(): string {
    if (localStorage.getItem('country')) {
      return localStorage.getItem('country');
    } else {
      const browserLanguage = this.translateService.getBrowserLang();
      if (
        browserLanguage === 'de' || browserLanguage === 'dk' || browserLanguage === 'en' ||
        browserLanguage === 'fr' || browserLanguage === 'it' || browserLanguage === 'es' ||
        browserLanguage === 'pl'
      ) {
        return browserLanguage;
      }
    }
    return 'en';
  }

  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) {
    this.uri = `${this.baseUrl}/${this.browserLang}/sw`;
  }

  headers = {
    'Content-Type': 'application/json',
    'firebase-context-token': null,
    'sw-context-token': localStorage.getItem('sw-token')
  };

  public customer = {
    countryId: null,
    email: null,
    password: null
  };

  public fakeSalutationId = '38b84044f5ac4384b78f3a09be1bee73';

  get cartState(): Observable<any> {
    return this.cartState$.asObservable();
  }

  setCartState(state: boolean): void {
    this.cartState$.next(state);
  }

  private sendRequest(url: string, method: string, body: string): Promise<any> {
    const headers = this.headers;
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
      })
      .catch(e => {
        return e;
      });
  }

  sendEmailforPasswordReset(mail: string) {
    const url = `${this.uri}/account/recovery-password`;
    const body = JSON.stringify({ email: mail });
    const method = 'POST';
    return this.sendRequest(url, method, body);
  }

  sendNewPassword(hash: string, pw: string, confirm: string) {
    const url = `${this.uri}/account/recovery-password-confirm`;
    const method = 'POST';
    const body = JSON.stringify({ hash, newPassword: pw, newPasswordConfirm: confirm });
    return this.sendRequest(url, method, body);
  }

  signup(customer): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer`;
    const body = JSON.stringify(customer);
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
      })
      .catch(e => {
        return e;
      });
  }

  signin(username, password): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/login`;
    const body = JSON.stringify({ username, password });
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) =>  {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
    })
      .then(({ 'sw-context-token': contextToken }) => {
        headers['sw-context-token'] = contextToken;
        localStorage.setItem('sw-token', contextToken);
      })
      .catch(e => {
        return e;
      });
  }

  validate(em, hash): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/account/register-confirm`;
    const body = JSON.stringify({ em, hash });
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
      })
      .catch(e => {
        return e;
      });
  }

  signout(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/logout`;
    return fetch(url, { method: 'POST', headers })
      .then((resp) => resp.text())
      .then(() => {
        headers['sw-context-token'] = null;
        // localStorage.removeItem('sw-token');
      });
  }

  getCountry(iso3): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/country?filter[iso3]=${iso3}`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => resp.json());
  }

  getCountries(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/country`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => resp.json());
  }

  getSalutation(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/salutation`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => resp.json());
  }

  getProfile(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => {
      if (!resp.ok) {
        throw resp.json();
      }
      return resp;
    })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  getCustomer(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  // getAddresses(): Promise<any> {
  //   const headers = this.headers;
  //   this.headers['sw-context-token'] = '1337'; // Delete this
  //   const url = `${this.uri}/customer/address`;
  //   return fetch(url, { method: 'GET', headers })
  //     .then((resp) => {
  //       if (!resp.ok) {
  //         throw resp.json();
  //       }
  //       return resp;
  //     })
  //     .then((resp) => resp.json())
  //     .then(({ data }) => data)
  //     .catch(e => e);
  // }

  setAddress(id: string, type: string): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/address/${id}/default-${type}`;
    return fetch(url, { method: 'PATCH', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  createAddress(address): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/address`;
    const body = JSON.stringify(address);
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  updateSWUser(data): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer`;
    const body = JSON.stringify(data);
    return fetch(url, { method: 'PATCH', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  updateAccountInfo(info, uri): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/account/${uri}`;
    const body = JSON.stringify(info);
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  getProducts(): Promise<any> {
    const headers = this.headers;
    return fetch(this.uri + '/product', { headers })
      .then((resp) => resp.json())
      .then(({ data }) => data);
  }

  getDeliveryMethods(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/order/deliveries`;
    return fetch(url, { method: 'POST', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  setDeliveryMethod(data: any): Promise<any> {
    const headers = this.headers;
    const body = JSON.stringify({ data });
    const url = `${this.uri}/order/deliveries/post`;
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.text())
      .catch(e => e);
  }

  getProductById(productId: string): Promise<any> {
    const headers = this.headers;
    return fetch(`${this.uri}/product/${productId}`, { headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => {
        return e;
      });
  }

  addProductToCart(productId: string, quantity: number): Promise<any> {
    const headers = this.headers;
    const body = JSON.stringify({ quantity });
    const url = `${this.uri}/checkout/cart/product/${productId}`;
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.text())
      .catch(e => e);
  }

  changeLineItemQuantity(id: string, quantity: number) {
    const headers = this.headers;
    const url = `${this.uri}/checkout/cart/line-item/${id}`;
    const body = JSON.stringify({ quantity });
    return fetch(url, { method: 'PATCH', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  deleteLineItem(id: string) {
    const headers = this.headers;
    const url = `${this.uri}/checkout/cart/line-item/${id}`;
    return fetch(url, { method: 'Delete', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  public getCart(): Observable<any> {
    const url = `${this.uri}/checkout/cart`;
    const headers = {
      'Content-Type': 'application/json',
      'sw-context-token': localStorage.getItem('sw-token')
    };
    return this.http.get(url, { headers });
  }

  getPayments() {
    const headers = this.headers;
    const init = { method: 'GET', headers };
    return fetch(this.uri + '/payment-method', init)
      .then((resp) => resp.json());
  }

  setPaymentMethod(id: string): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/context`;
    const method = { paymentMethodId: id };
    const body = JSON.stringify(method);
    return fetch(url, { method: 'PATCH', headers, body })
      .then((resp) => resp.json())
      .then(({ data }) => data);
  }

  orderProducts(customer): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/checkout/order`;
    const body = JSON.stringify(customer);
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  payOrder(order: any, platforms: string[]): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/checkout/order/${order.id}/pay`;
    const data = {
      order: order,
      platforms: platforms
    };
    const body = JSON.stringify(data);
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp: any) => {
        return resp.json();
      })
      .catch(e => e);
  }

  getOrders(): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/order`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  getOrderDetails(orderId: string): Promise<any> {
    const headers = this.headers;
    const url = `${this.uri}/customer/order/${orderId}`;
    return fetch(url, { method: 'GET', headers })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }

  sendCancellation(data: any) {
    const url = `${this.uri}/contact-form`;
    const body = {
      comment: data.comment,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      salutationId: data.salutationId,
      subject: data.subject
    };
    const method = 'POST';
    return this.sendRequest(url, method, JSON.stringify(body));
  }

  // generateQrCode(order: string, id: string, pet: string, fbtoken: string): Promise<any> {
  //   const obj = {
  //     orderId: order,
  //     uid: id,
  //     petId: pet,
  //     token: fbtoken
  //   };
  //   const headers = this.headers;
  //   const url = `${this.baseUrl}/postmethod_qrcode_generator`;
  //   const body = JSON.stringify(obj);
  //   return fetch(url, { method: 'POST', headers, body })
  //     .then((resp) => resp.json())
  //     .then(({ data }) => data);
  // }

  sendOrderId(order: string): Promise<any> {
    const obj = {
      orderId: order
    };

    const headers = this.headers;
    const url = `${this.uri}/checkout/finish-url`;
    const body = JSON.stringify(obj);

    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.json())
      .catch(e => e);
  }
}
