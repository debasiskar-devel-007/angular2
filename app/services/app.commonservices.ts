export class AppCommonservices {
    items:Array<any>;
    //http:Http;
    url:any
    constructor() {
        //this.http=http;

        if(window.location.hostname=='localhost'){
            this.url= 'http://localhost:8001/';
        }
        else{
            this.url= 'http://influxiq.com:8001/';
        }
        this.items = [
            { serverUrl: this.url },
            { name: 'Pascal Precht' },
            { n2: 'thoughtram' }
        ];
    }

    getItems() {
        return this.items;
    }

    getExpyears(){
        let   expYears=[
            {
                "value": "2016",
            },{
                "value": "2017",
            },{
                "value": "2018",
            },{
                "value": "2019",
            },{
                "value": "2020",
            },{
                "value": "2021",
            },{
                "value": "2022",
            },{
                "value": "2023",
            },{
                "value": "2024",
            },{
                "value": "2025",
            },{
                "value": "2026",
            },{
                "value": "2027",
            },{
                "value": "2028",
            },{
                "value": "2029",
            },{
                "value": "2030",
            },{
                "value": "2031",
            },{
                "value": "2032",
            },{
                "value": "2033",
            }
            ];

        return expYears;
    }

    getMonths(){
        let   expMonths=[
            {
                "value": "01",
            },{
                "value": "02",
            },{
                "value": "03",
            },{
                "value": "04",
            },{
                "value": "05",
            },{
                "value": "06",
            },{
                "value": "07",
            },{
                "value": "08",
            },{
                "value": "09",
            },{
                "value": "10",
            },{
                "value": "11",
            },{
                "value": "12",
            }
        ];

        return expMonths;
    }





}

