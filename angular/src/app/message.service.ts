import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  success(text = '', title = '') {
    this.toastr.success(text, title || "УСПЕХ")
  }

  warning(text = '', title = '') {
    this.toastr.warning(text, title || "ВНИМАНИЕ")
  }

  error(text = '', title = '') {
    this.toastr.error(text, title || "ОШИБКА")
  }

  correctAnswer() {
    this.success('Ответ верный', 'ВЕРНО')
  }

  wrongAnswer() {
    this.error('Ответ неправильный', 'НЕВЕРНО')
  }
}
