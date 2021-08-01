import {FormArray} from "@angular/forms";
import {Subject} from "rxjs";

export interface IAddPrepDialogInputData {
  editedRows: FormArray;
  reSearch: Subject<any>;
}
