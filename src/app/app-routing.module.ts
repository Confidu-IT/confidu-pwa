import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  { path: 'signup', loadChildren: () => import('./user/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'signin', loadChildren: () => import('./user/signup/signup.module').then(m => m.SignupPageModule) },
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
    loadChildren: () => import('./pets/pets-list/pets-list.module').then(m => m.PetsListPageModule)
  },
  { path: 'pets/pet-create', loadChildren: () => import('./pets/create-pet/create-pet.module').then(m => m.CreatePetPageModule) },
  {
    path: 'pets/pet-care-card/:petId',
    loadChildren: () => import('./pets/pet-care-card/pet-care-card.module').then(m => m.PetCareCardPageModule)
  },
  {
    path: 'pets/pet-care-card/:petId/:label/:key',
    loadChildren: () => import('./pets/pet-care-card/care-card-list/care-card-list.module').then( m => m.CareCardListPageModule)
  },
  {
    path: 'pets/pet-care-card-detail/:key/:list/:venom/:id/:label',
    loadChildren: () => import('./pets/pet-care-card/care-card-detail/care-card-detail.module').then( m => m.CareCardDetailPageModule)
  },
  { path: 'shop/product/:productId',
    loadChildren: () => import('./shop/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  { path: 'shop/cart',
    loadChildren: () => import('./shop/cart/cart.module').then(m => m.CartPageModule)
  },
  { path: 'shop/billing-address',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule)
  },
  { path: 'shop/shipment-address',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule)
  },
  { path: 'shop/address/:type',
    loadChildren: () => import('./shop/billing-address/billing-address.module').then(m => m.BillingAddressPageModule)
  },
  { path: 'shop/payment',
    loadChildren: () => import('./shop/payment/payment.module').then(m => m.PaymentPageModule)
  },
  { path: 'shop/order',
    loadChildren: () => import('./shop/order/order.module').then(m => m.OrderPageModule)
  },
  { path: 'shop/order-summary/:orderId',
    loadChildren: () => import('./shop/order-summary/order-summary.module').then(m => m.OrderSummaryPageModule)
  },
  {
    path: 'shop/order-history',
    loadChildren: () => import('./shop/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  { path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  { path: 'tickets/televet-pet',
    loadChildren: () => import('./tickets/televet/televet-pet/televet-pet.module').then( m => m.TelevetPetPageModule)
  },
  {
    path: 'tickets/televet-emergency',
    loadChildren: () => import('./tickets/televet/televet-emergency/televet-emergency.module').then( m => m.TelevetEmergencyPageModule)
  },
  {
    path: 'tickets/prescription',
    loadChildren: () => import('./tickets/prescription/prescription.module').then(m => m.PrescriptionPageModule)
  },
  {
    path: 'tickets/beats/:symptom',
    loadChildren: () => import('./tickets/pulse/pulse.module').then( m => m.PulsePageModule)
  },
  {
    path: 'ticket/:ticketId/:dateId',
    loadChildren: () => import('./tickets/ticket/ticket.module').then( m => m.TicketPageModule)
  },
  { path: 'tickets/ticket/:id/guide',
    loadChildren: () => import('./tickets/ticket-guide/ticket-guide.module').then( m => m.TicketGuidePageModule)
  },
  { path: 'tickets/ticket/:id/info',
    loadChildren: () => import('./tickets/ticket-info/ticket-info.module').then( m => m.TicketInfoPageModule)
  },
  {
    path: 'tickets/ticket/:id/order',
    loadChildren: () => import('./tickets/ticket-order/ticket-order.module').then( m => m.TicketOrderPageModule)
  },
  { path: 'tickets/ticket/:id/info/:ticketKey',
    loadChildren: () => import('./tickets/ticket-info/ticket-info.module').then( m => m.TicketInfoPageModule)
  },
  { path: 'tickets/ticket/:id/guide/:ticketKey',
    loadChildren: () => import('./tickets/ticket-guide/ticket-guide.module').then( m => m.TicketGuidePageModule)
  },
  {
    path: 'tickets/ticket/:id/order/:ticketKey',
    loadChildren: () => import('./tickets/ticket-order/ticket-order.module').then( m => m.TicketOrderPageModule)
  },
  { path: 'tickets/:type/:symptom/:id/result',
    loadChildren: () => import('./tickets/ticket-result/ticket-result.module').then( m => m.TicketResultPageModule)
  },
  { path: 'tickets/:type/:symptom/result',
    loadChildren: () => import('./tickets/ticket-result/ticket-result.module').then( m => m.TicketResultPageModule)
  },
  { path: 'tickets/:type/:code/:symptom/:id/questions',
    loadChildren: () => import('./tickets/ticket-questions/ticket-questions.module').then( m => m.TicketQuestionsPageModule)
  },
  { path: 'tickets/:type/:code/:symptom/questions',
    loadChildren: () => import('./tickets/ticket-questions/ticket-questions.module').then( m => m.TicketQuestionsPageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./walkthrough/walkthrough.module').then( m => m.WalkthroughPageModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then( m => m.LabPageModule)
  },
  {
    path: 'lab/:activationKey',
    loadChildren: () => import('./lab/lab.module').then( m => m.LabPageModule)
  },
  {
    path: 'lab-detail/:type',
    loadChildren: () => import('./lab-detail/lab-detail.module').then( m => m.LabDetailPageModule)
  },
  {
    path: 'diseases',
    loadChildren: () => import('./diseases/diseases.module').then(m => m.DiseasePageModule)
  },
  {
    path: 'user/account',
    loadChildren: () => import('./user/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'user/notifications',
    loadChildren: () => import('./user/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'follow-up-prescription',
    loadChildren: () => import('./follow-up-prescription/follow-up-prescription.module').then( m => m.FollowUpPrescriptionPageModule)
  },
  {
    path: 'ration-check',
    loadChildren: () => import('./ration-check/ration-check.module').then( m => m.RationCheckPageModule)
  },
  {
    path: 'consultation',
    loadChildren: () => import('./consultation/consultation.module').then( m => m.ConsultationPageModule)
  },
  {
    path: 'consultation/scheduler/:id',
    loadChildren: () => import('./consultation/consultation-scheduler/consultation-scheduler.module').then( m => m.ConsultationSchedulerPageModule)
  },
  {
    path: 'consultation-booking/:id',
    loadChildren: () => import('./consultation/consultation-booking/consultation-booking.module').then( m => m.ConsultationBookingPageModule)
  },
  {
    path: 'invoice-upload/:petId/:label/:key',
    loadChildren: () => import('./invoice/invoice-upload/invoice-upload.module').then(m => m.InvoiceUploadPageModule)
  },
  {
    path: 'invoice-result/:key',
    loadChildren: () => import('./invoice/invoice-result/invoice-result.module').then(m => m.InvoiceResultPageModule)
  },
  {
    path: 'article/:type/:id',
    loadChildren: () => import('./articles/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
  },
  {
    path: 'user/notifications-list',
    loadChildren: () => import('./user/notifications/notifications-list/notifications-list.module').then(m => m.NotificationsListPageModule)
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
