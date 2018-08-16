import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static PasswordMatch(absCon: AbstractControl) {
    let password = absCon.get('password').value;
    let confirmPassword = absCon.get('passwordConfirmation').value;

    if (password != confirmPassword) {
      console.log('false');
      absCon.get('passwordConfirmation').setErrors( { PasswordMatch: true } );
    } else {
      console.log('true');
      return null;
    }
  }
}
