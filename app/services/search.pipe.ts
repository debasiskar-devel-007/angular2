import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class searchPipe implements PipeTransform {
    item:any;
    transform(items:any, filter:any) {
        if(filter)
            {
                return items.filter(itemc);
                function itemc(item:any) {
                    for (let key in item) {
                        if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                            (item[key].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) !== -1)) {
                            return true;
                        }
                    }
                }
            }

        return items;
    }
        // /let item :string;
    //todo.fname.indexOf(filter)!==-1
       /*return value.filter(item =>{
           for(let key in item){
               if((typeof item[key]==='string' || item[key] instanceof String) &&
               (item[key].indexOf(args[0])!==1)){
            return true;
        }
           }
       });*/
    //}
}
