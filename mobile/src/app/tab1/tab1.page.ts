import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';

  constructor(private payPal: PayPal) { }

  payWithPaypal(){
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'ASrkk9Ob1cJFJTqhIkhe7PExQH6bZAfYZntlrrbE4LbVaw-5BqvOwyXaDuwepOwc3BO_7C2eC4gjkTKB'

    }).then(()=> {

      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: false,
        languageOrLocalse: 'pt-BR',
        merchantName: 'Default Ionic 5 Paypal',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''

      })).then(() => {
        
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'Sale' );
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          console.log('pagamento efetuado');
        }, () => {
          console.log('erro ao renderizar');
        });

      });

    });

  }

}
