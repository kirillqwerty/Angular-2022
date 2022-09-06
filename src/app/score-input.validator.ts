import { AbstractControl } from "@angular/forms";

export function dartsValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if ((control.value === 25 || control.value === 50) || (control.value >= 0 && control.value <= 20)) {
        return null
    }

    else return {"valueError": true};
}