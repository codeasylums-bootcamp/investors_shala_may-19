let stockArray=[
{name:"Apple Inc.", symbol:"AAPL", div:"-1"},
{name:"HSBC Holdings",symbol:"HSBA.L", div:"-1"},
{name:"Microsoft Corporation",symbol:"MSFT", div:"-1"},
{name:"Tata Sponge Iron",symbol:"TATASPONGE.NS", div:"-1"},
{name:"Defiance Future Tech ETF",symbol:"AUGR",div:"-1"},
{name:"Future Data Grp",symbol:"8229.HK",div:"-1"},
{name:"Focus Media Information Technology",symbol:"002027.SZ",div:"-1"},
{name:"Tower Real Estate Investment Trust",symbol:"5111.KL",div:"-1"},
{name:"FTSE 350 Banks",symbol:"^NMX8350",div:"-1"},
{name:"HDFC Bank",symbol:"HDB",div:"-1"},
{name:"Indian Rupee",symbol:"INR",div:"-1"},
{name:"Wipro Limited",symbol:"WIPRO.NS",div:"-1"},
{name:"Bajaj Auto",symbol:"BAJAJ-AUTO.NS",div:"-1"},
{name:"State Bank Of India",symbol:"SBIN.NS",div:"-1"},
{name:"Axis Real Estate Investment Trust",symbol:"5106.KL",div:"-1"}
];
let dropList=document.getElementById("list");
for(let x in stockArray){
	let newElement=document.createElement("div");
	newElement.innerHTML=`
		<input id="check${x}" type="checkbox" onchange="req(${x})">
	<p style="display:inline-block;">${stockArray[x].name}</p>
	`;
	dropList.appendChild(newElement);
}
function g(count,x){
	y=parseInt(x.price);
	Highcharts.stockChart('container'+count, {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                
            }
        }
    },
   backgroundColor: '#DDDDDD',
    time: {
        useUTC: false
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: x.name
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: x.name+" Stocks",
        data: (function () {
			var data = [];
			for (i = -99999; i <=0; i++) {       
                time = (new Date()).getTime(),
                data.push([
                    time + i * 1000,
                    (y+Math.random()*2-1)
                ]);
            }
            return data;
        }())
    }]
});

}
let count=0;
 function f(x,c)
 {
	 var v;
	 let counter=0;
	 let body="";
	 let table=document.getElementById("table"+c);
	 console.log(table);
	for(var z in x)
	{
		counter++;
		if(counter%2!=0){	
		v=document.createElement("tr");
		table.appendChild(v);
		}
		let p;
		if(counter>2) p=document.createElement("td");
		else p=document.createElement("th");
		p.innerHTML=z.toUpperCase()+": "+x[z];
		p.className="desc"+parseInt((counter/2))%2;
		v.appendChild(p);
	}	
 }
 function list(data){
	 console.log(data);
	 count++;
	 let stocks=document.getElementById("stockList");
	let newStock=document.createElement("div");
	newStock.innerHTML=`
    <div class="card-header no-dec" id="heading${count}">
      <h1 class="mb-0">
        <button class="btn btn-link special" type="button" data-toggle="collapse" data-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">
          ${data.name}
        </button>
      </h1>
    </div>
    <div id="collapse${count}" class="collapse" aria-labelledby="heading${count}" data-parent="#stockList">
      <div class="card-body">
	  <table id="table${count}">
	  </table>
      </div>
	  <div id="container${count}" style="width:100%; height: 400px; margin: 0 auto;"></div>
    </div>
	`
	newStock.className="card";
	stocks.appendChild(newStock);
	f(data,count);
	g(count,data);
 }
 function req(ind){
	 let checkB=document.getElementById("check"+ind);
	 if(checkB.checked){
		 stockArray[ind].div=count+1;
let url="https://api.worldtradingdata.com/api/v1/stock?symbol="+stockArray[ind].symbol+"&api_token=OwH8mbbaPDMZS8BqC4gEScDwftHfS3JEI1Ca6gx7n4Ekl5LnmiEc5MRH8IF1";
 axios.get(url)
 .then(function(response){	
console.log(response); 
	 list(response.data.data[0]);
 })
 .catch(function(error){console.log(error);});
 }
 else{
	 	 let deletedDiv=document.getElementById("heading"+stockArray[ind].div);
		deletedDiv.innerHTML="";
 }
 }
	