import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOnline'
})
export class IsOnlinePipe implements PipeTransform {

  transform(isOnline: boolean): any {
    return isOnline ? "Online" : "Offline";
  }

}