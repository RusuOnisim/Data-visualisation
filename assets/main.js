// add to html the canvas tag with the id myChart and put it before table1

const canvas = document.createElement('canvas');
canvas.id = 'myChart'; 
const ctx1 = canvas.getContext('2d');
const targetTable = document.getElementById('table1');
targetTable.parentNode.insertBefore(canvas, targetTable);


// declare the variables of the years, country and data for each country form the table1
const thElements = Array.from(document.querySelector('th[dir="ltr"]').parentElement.querySelectorAll('th'));
console.table(thElements);
const years = thElements.slice(2).map(th => th.innerText);
const countries = Array.from(targetTable.querySelectorAll('tbody td:nth-child(2)')).map(td => td.textContent);
const data = [];
for (let i = 2; i < table1.rows.length; i++) {
    const row = table1.rows[i];
    const datacountries=[];
  for(let j=2;j<row.cells.length;j++)
  {
    datacountries.push(parseFloat(row.cells[j].textContent.replace(",", ".")));
  }
  data.push(datacountries);
}

// Checking the variables to see if i get the good variables
console.table(years);
console.table(countries);
console.table(data);



// creating a chart using chart.js to see all the dates for each county in each year
const myChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: countries,
        datasets: years.map((year, index) => ({
            label: year,
            data: data.map(row => row[index]),
        }))
    }
  });
 







// creating 2nd canvas tag with the id myChart 2 and put it before table2
const canvas2 = document.createElement('canvas');
canvas2.id = 'myChart2'; 
const ctx2 = canvas2.getContext('2d');
const targetTable2 = document.getElementById('table2');
targetTable2.parentNode.insertBefore(canvas2, targetTable2);




// creating variables for countries, year and data's from the table2 

const countries2 = Array.from(
    document.querySelectorAll("#table2 tbody td:nth-child(2)")
  ).map((td) => td.textContent);
  const data2 = [];
  for (let i = 1; i < table2.rows.length; i++) {
      const row = table2.rows[i];
      const datacountries2=[];
    for(let j=2;j<row.cells.length;j++)
    {
      datacountries2.push(parseFloat(row.cells[j].textContent.replace(",", ".")));
    }
    data2.push(datacountries2);
  }
  const years2 = Array.from(targetTable2.querySelectorAll("thead th:nth-child(n+3)"))
  .map(th => th.textContent);

  // checking if i get the good data's for variables
  console.table(data2);
  console.table(countries2);



// 2nd chart for table 2 

  const myChart2 = new Chart(ctx2, {
    type: 'bar', 
    data: {
        labels: countries2,
        datasets: years2.map((year, index) => ({
            label: year,
            data: data2.map((dataByYear) => dataByYear[index]),
        })),
    },
  });
  
  // 3rd canvas tag with the id myChart3 i put it before first h1 in html 
const canvas3 = document.createElement('canvas');
canvas3.id = 'myChart3';
const ctx3 = canvas3.getContext('2d');
const heading1 = document.getElementById('firstHeading');
heading1.parentNode.insertBefore(canvas3, heading1);
// getting variables
var dataPoints = [];
var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Data Points',
            data: dataPoints,
            fill: false,
            borderColor: 'black',
            tension: 0.1
        }]
    },
});

function fetchData() {
    var url = "https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1]) + "&length=1&type=json" ;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                dataPoints.push(data[0][1]);
                myChart3.data.labels.push(data[0][0]);
                myChart3.update();
            }
            console.log(dataPoints)
        })
        .catch(error => console.error("Error fetching data: " + error));

    setTimeout(fetchData, 1000); 
}

fetchData(); 
