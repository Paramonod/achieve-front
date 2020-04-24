import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {finalize} from 'rxjs/operators';
import {DashboardService} from './dashboard.service';
import {AuthService} from '../shared/authentication/auth.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public gradientStroke;
    public chartColor;
    public canvas: any;
    public ctx;
    public gradientFill;
    // constructor(private navbarTitleService: NavbarTitleService) { }
    public gradientChartOptionsConfiguration: any;
    public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

    public activeUsersChartType;
    public activeUsersChartData: Array<any>;
    public activeUsersChartOptions: any;
    public activeUsersChartLabels: Array<any>;
    public activeUsersChartColors: Array<any>;

    constructor(private dashboardService: DashboardService, private authService: AuthService) {
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public hexToRGB(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        } else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }

    public ngOnInit() {

        this.dashboardService.fetchTopSecretData(this.authService.authorizationHeaderValue)
            .pipe(finalize(() => {

            })).subscribe(
            result => {
                console.log(result)
            });

        this.chartColor = '#FFFFFF';

        var cardStatsMiniLineColor = '#fff',
            cardStatsMiniDotColor = '#fff';

        this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                bodySpacing: 4,
                mode: 'nearest',
                intersect: 0,
                position: 'nearest',
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            zeroLineColor: 'transparent',
                            drawBorder: false
                        }
                    }
                ],
                xAxes: [
                    {
                        display: 0,
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            zeroLineColor: 'transparent',
                            drawTicks: false,
                            display: false,
                            drawBorder: false
                        }
                    }
                ]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 15
                }
            }
        };

        this.canvas = document.getElementById('pointsChart');
        this.ctx = this.canvas.getContext('2d');

        this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
        this.gradientStroke.addColorStop(0, '#18ce0f');
        this.gradientStroke.addColorStop(1, this.chartColor);

        this.gradientFill = this.ctx.createLinearGradient(0, 400, 0, 50);
        this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
        this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));
        myChart = new Chart(this.ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: ['12pm,', '3pm', '6pm', '9pm', '12am', '3am', '6am', '9am'],
                datasets: [
                    {
                        label: 'Email Stats',
                        borderColor: '#18ce0f',
                        pointBorderColor: '#FFF',
                        pointBackgroundColor: '#18ce0f',
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        backgroundColor: this.gradientFill,
                        borderWidth: 2,
                        data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
                    }
                ]
            },
            options: this.gradientChartOptionsConfigurationWithNumbersAndGrid
        });

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    // Get ctx from string
                    var ctx = chart.chart.ctx;

                    // Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
                    var color = centerConfig.color || '#000';
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                    // Start with a base font of 30px
                    ctx.font = '30px ' + fontStyle;

                    // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    var stringWidth = ctx.measureText(txt).width;
                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    var widthRatio = elementWidth / stringWidth;
                    var newFontSize = Math.floor(30 * widthRatio);
                    var elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    var fontSizeToUse = Math.min(newFontSize, elementHeight);

                    // Set font settings to draw it correctly.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                    ctx.font = fontSizeToUse + 'px ' + fontStyle;
                    ctx.fillStyle = color;

                    // Draw text in center
                    ctx.fillText(txt, centerX, centerY);
                }
            }
        });

        this.canvas = document.getElementById('chartDonut1');
        this.ctx = this.canvas.getContext('2d');

        myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: [1, 2],
                datasets: [{
                    label: 'Emails',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ['#4acccd', '#f4f3ef'],
                    borderWidth: 0,
                    data: [60, 40]
                }]
            },
            options: {
                elements: {
                    center: {
                        text: '60%',
                        color: '#66615c', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 60 // Defualt is 20 (as a percentage)
                    }
                },
                cutoutPercentage: 90,
                legend: {

                    display: false
                },

                tooltips: {
                    enabled: false
                },

                scales: {
                    yAxes: [{

                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: 'transparent',
                            color: 'rgba(255,255,255,0.05)'
                        }

                    }],

                    xAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(255,255,255,0.1)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
            }
        });

        this.canvas = document.getElementById('chartDonut2');
        this.ctx = this.canvas.getContext('2d');

        myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: [1, 2],
                datasets: [{
                    label: 'Emails',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ['#fcc468', '#f4f3ef'],
                    borderWidth: 0,
                    data: [34, 66]
                }]
            },
            options: {
                elements: {
                    center: {
                        text: '34%',
                        color: '#66615c', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 60 // Defualt is 20 (as a percentage)
                    }
                },
                cutoutPercentage: 90,
                legend: {

                    display: false
                },

                tooltips: {
                    enabled: false
                },

                scales: {
                    yAxes: [{

                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: 'transparent',
                            color: 'rgba(255,255,255,0.05)'
                        }

                    }],

                    xAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(255,255,255,0.1)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
            }
        });

        this.canvas = document.getElementById('chartDonut3');
        this.ctx = this.canvas.getContext('2d');

        myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: [1, 2],
                datasets: [{
                    label: 'Emails',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ['#f17e5d', '#f4f3ef'],
                    borderWidth: 0,
                    data: [80, 20]
                }]
            },
            options: {
                elements: {
                    center: {
                        text: '80%',
                        color: '#66615c', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 60 // Defualt is 20 (as a percentage)
                    }
                },
                cutoutPercentage: 90,
                legend: {

                    display: false
                },

                tooltips: {
                    enabled: false
                },

                scales: {
                    yAxes: [{

                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: 'transparent',
                            color: 'rgba(255,255,255,0.05)'
                        }

                    }],

                    xAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(255,255,255,0.1)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
            }
        });


        this.canvas = document.getElementById('chartDonut4');
        this.ctx = this.canvas.getContext('2d');

        var myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: [1, 2],
                datasets: [{
                    label: 'Emails',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ['#66615b', '#f4f3ef'],
                    borderWidth: 0,
                    data: [11, 89]
                }]
            },
            options: {
                elements: {
                    center: {
                        text: '11%',
                        color: '#66615c', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 60 // Defualt is 20 (as a percentage)
                    }
                },
                cutoutPercentage: 90,
                legend: {

                    display: false
                },

                tooltips: {
                    enabled: false
                },

                scales: {
                    yAxes: [{

                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: 'transparent',
                            color: 'rgba(255,255,255,0.05)'
                        }

                    }],

                    xAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(255,255,255,0.1)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
            }
        });
    }
}
