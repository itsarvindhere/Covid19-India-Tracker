$(document).ready(function(){
    
  function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  const url = "https://api.covid19india.org/data.json";

  $.get(url, function(data){

     const activeCases = data.statewise[0].active;
     const recoveredCases = data.statewise[0].recovered;
     const confirmedCases = data.statewise[0].confirmed;
     const deaths = data.statewise[0].deaths;

     $(".confirmed").text(formatNumber(confirmedCases));
     $(".active").text(formatNumber(activeCases));
     $(".recovered").text(formatNumber(recoveredCases));  
     $(".deaths").text(formatNumber(deaths));
   
     for(var i = 1; i < data.statewise.length; i++){
         $("tbody").append(`<tr>
            <th scope="row">${data.statewise[i].state}</th>
            <td>${formatNumber(data.statewise[i].confirmed)}</td>
            <td>${formatNumber(data.statewise[i].active)}</td>
            <td>${formatNumber(data.statewise[i].recovered)}</td>
            <td>${formatNumber(data.statewise[i].deaths)}</td>
          </tr>`);
     }
    
     var ctx = $('#confirmedChart')[0].getContext('2d');
    
     var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Confirmed Cases", "Active Cases", "Recovered", "Deaths"],
            datasets: [{
                label: "Total",
                data: [confirmedCases, activeCases, recoveredCases, deaths],
                backgroundColor: ['rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',],
            }]
        },
    });      
  
  
  })



  });
