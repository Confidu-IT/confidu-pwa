import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {RouteGuard} from './shared/guards/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'signup', loadChildren: () => import('./user/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'signin', loadChildren: () => import('./user/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'registration/:registrationHash',
    loadChildren: () => import('./user/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'verification/:type/:mail',
    loadChildren: () => import('./user/signup/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'account/recover',
    loadChildren: () => import('./user/account/pw-recovery/pw-recovery.module').then(m => m.PwRecoveryPageModule)
  },
  {
    path: 'account/recover/:recoverLink',
    loadChildren: () => import('./user/account/pw-recovery/pw-recovery.module').then(m => m.PwRecoveryPageModule)
  },
  {
    path: 'pets/pets-list',
    loadChildren: () => import('./pets/pets-list/pets-list.module').then(m => m.PetsListPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'pets/pet-create', loadChildren: () => import('./pets/create-pet/create-pet.module').then(m => m.CreatePetPageModule) },
  {
    path: 'pets/pet-care-card/:petId',
    loadChildren: () => import('./pets/pet-care-card/pet-care-card.module').then(m => m.PetCareCardPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'pets/pet-care-card/:petId/:label/:key',
    loadChildren: () => import('./pets/pet-care-card/care-card-list/care-card-list.module').then( m => m.CareCardListPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'pets/pet-care-card-detail/:key/:list/:venom/:id/:label',
    loadChildren: () => import('./pets/pet-care-card/care-card-detail/care-card-detail.module').then( m => m.CareCardDetailPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/product/:productId',
    loadChildren: () => import('./shop/product-detail/product-detail.module').then(m => m.ProductDetailPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/cart',
    loadChildren: () => import('./shop/cart/cart.module').then(m => m.CartPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/billing-address',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/shipment-address',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/address/:type',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/payment',
    loadChildren: () => import('./shop/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/order',
    loadChildren: () => import('./shop/order/order.module').then(m => m.OrderPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'shop/order-summary/:orderId',
    loadChildren: () => import('./shop/order-summary/order-summary.module').then(m => m.OrderSummaryPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'shop/order-history',
    loadChildren: () => import('./shop/order-history/order-history.module').then( m => m.OrderHistoryPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/televet-pet',
    loadChildren: () => import('./tickets/televet/televet-pet/televet-pet.module').then( m => m.TelevetPetPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'tickets/televet-emergency',
    loadChildren: () => import('./tickets/televet/televet-emergency/televet-emergency.module').then( m => m.TelevetEmergencyPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'tickets/prescription',
    loadChildren: () => import('./tickets/prescription/prescription.module').then(m => m.PrescriptionPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'tickets/beats/:symptom',
    loadChildren: () => import('./tickets/pulse/pulse.module').then( m => m.PulsePageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'ticket/:ticketId/:dateId',
    loadChildren: () => import('./tickets/ticket/ticket.module').then( m => m.TicketPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'ticket/:ticketId/:dateId/:ref',
    loadChildren: () => import('./tickets/ticket/ticket.module').then( m => m.TicketPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/ticket/:id/guide',
    loadChildren: () => import('./tickets/ticket-guide/ticket-guide.module').then( m => m.TicketGuidePageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/ticket/:id/info',
    loadChildren: () => import('./tickets/ticket-info/ticket-info.module').then( m => m.TicketInfoPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'tickets/ticket/:id/order',
    loadChildren: () => import('./tickets/ticket-order/ticket-order.module').then( m => m.TicketOrderPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/ticket/:id/info/:ticketKey',
    loadChildren: () => import('./tickets/ticket-info/ticket-info.module').then( m => m.TicketInfoPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/ticket/:id/guide/:ticketKey',
    loadChildren: () => import('./tickets/ticket-guide/ticket-guide.module').then( m => m.TicketGuidePageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'tickets/ticket/:id/order/:ticketKey',
    loadChildren: () => import('./tickets/ticket-order/ticket-order.module').then( m => m.TicketOrderPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/:type/:symptom/:id/result',
    loadChildren: () => import('./tickets/ticket-result/ticket-result.module').then( m => m.TicketResultPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/:type/:symptom/result',
    loadChildren: () => import('./tickets/ticket-result/ticket-result.module').then( m => m.TicketResultPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/:type/:code/:symptom/:id/questions',
    loadChildren: () => import('./tickets/ticket-questions/ticket-questions.module').then( m => m.TicketQuestionsPageModule),
    canActivate: [RouteGuard]
  },
  { path: 'tickets/:type/:code/:symptom/questions',
    loadChildren: () => import('./tickets/ticket-questions/ticket-questions.module').then( m => m.TicketQuestionsPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./walkthrough/walkthrough.module').then( m => m.WalkthroughPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then( m => m.LabPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'lab/:activationKey',
    loadChildren: () => import('./lab/lab.module').then( m => m.LabPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'diseases',
    loadChildren: () => import('./diseases/diseases.module').then(m => m.DiseasePageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'user/account',
    loadChildren: () => import('./user/account/account.module').then( m => m.AccountPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'user/notifications',
    loadChildren: () => import('./user/notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'follow-up-prescription',
    loadChildren: () => import('./follow-up-prescription/follow-up-prescription.module').then( m => m.FollowUpPrescriptionPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'ration-check',
    loadChildren: () => import('./ration-check/ration-check.module').then( m => m.RationCheckPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'consultation',
    loadChildren: () => import('./consultation/consultation.module').then( m => m.ConsultationPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'consultation/scheduler/:id',
    loadChildren: () => import('./consultation/consultation-scheduler/consultation-scheduler.module').then( m => m.ConsultationSchedulerPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'consultation-booking/:id',
    loadChildren: () => import('./consultation/consultation-booking/consultation-booking.module').then( m => m.ConsultationBookingPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'invoice-upload/:petId/:label/:key',
    loadChildren: () => import('./invoice/invoice-upload/invoice-upload.module').then(m => m.InvoiceUploadPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'invoice-result/:key',
    loadChildren: () => import('./invoice/invoice-result/invoice-result.module').then(m => m.InvoiceResultPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'article/:type/:id',
    loadChildren: () => import('./articles/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'user/notifications-list',
    loadChildren: () => import('./user/notifications/notifications-list/notifications-list.module').then(m => m.NotificationsListPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'benefits',
    loadChildren: () => import('./benefits/benefits.module').then( m => m.BenefitsPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'help/pwa-instructions',
    loadChildren: () => import('./help/pwa-instructions/pwa-instructions.module').then( m => m.PwaInstructionsPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'benefits-detail/:type',
    loadChildren: () => import('./benefits/benefits-detail/benefits-detail.module').then( m => m.BenefitsDetailPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'order-error',
    loadChildren: () => import('./shop/order-error/order-error.module').then( m => m.OrderErrorPageModule),
    canActivate: [RouteGuard]
  },

  {
    path: 'activation',
    loadChildren: () => import('./shop/activation/activation.module').then( m => m.ActivationPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'activation/:activationKey',
    loadChildren: () => import('./shop/activation/activation.module').then( m => m.ActivationPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'order-details/:orderId',
    loadChildren: () => import('./shop/order-details/order-details.module').then( m => m.OrderDetailsPageModule),
    canActivate: [RouteGuard]
  },

  {
    path: 'order-cancellation/:orderNr',
    loadChildren: () => import('./shop/order-cancellation/order-cancellation.module').then( m => m.OrderCancellationPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'diagnosis',
    loadChildren: () => import('./diagnosis/diagnosis.module').then( m => m.DiagnosisPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'initial',
    loadChildren: () => import('./initial/initial.module').then( m => m.InitialPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'shop/delivery',
    loadChildren: () => import('./shop/delivery/delivery.module').then( m => m.DeliveryPageModule),
    canActivate: [RouteGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
