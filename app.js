$(document).ready(function(){
    
   
  const url = "https://api.covid19india.org/data.json";

  $.get(url, function(data){

     const activeCases = data.statewise[0].active;
     const recoveredCases = data.statewise[0].recovered;
     const confirmedCases = data.statewise[0].confirmed;
     const deaths = data.statewise[0].deaths;

     $(".confirmed").text(confirmedCases);
     $(".active").text(activeCases);
     $(".recovered").text(recoveredCases);  
     $(".deaths").text(deaths);

    const stateNames = [];
    const activeCaseArray = [];
    const deathsArray = [];
    const recoveredCaseArray = [];
    const confirmedCaseArray = [];

    for(var i = 1; i < data.statewise.length; i++){
      stateNames.push(data.statewise[i].state);
      activeCaseArray.push(data.statewise[i].active);
      recoveredCaseArray.push(data.statewise[i].recovered);
      confirmedCaseArray.push(data.statewise[i].confirmed);
      deathsArray.push(data.statewise[i].deaths);

    }

     
     for(var i = 1; i < data.statewise.length; i++){
         $("tbody").append(`<tr>
            <th scope="row">${data.statewise[i].state}</th>
            <td>${data.statewise[i].confirmed}</td>
            <td>${data.statewise[i].active}</td>
            <td>${data.statewise[i].recovered}</td>
            <td>${data.statewise[i].deaths}</td>
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