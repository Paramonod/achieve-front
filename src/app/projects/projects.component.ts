import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    moduleId: module.id,
    selector: 'projects-cmp',
    templateUrl: 'projects.component.html'
})

export class ProjectsComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;

    ngOnInit() {
        this.dataTable = {
            headerRow: ['Название', 'Куратор', 'Профиль', 'Действия'],
            footerRow: ['Название', 'Куратор', 'Профиль', 'Действия'],
            dataRows: [
                ['Airi Satou', 'Andrew Mike', 'Develop', ''],
                ['Angelica Ramos', 'John Doe', 'Design', 'btn-round'],
                ['Ashton Cox', 'Alex Mike', 'Design', 'btn-simple'],
                ['Bradley Greer', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Brenden Wagner', 'Paul Dickens', 'Communication', ''],
                ['Brielle Williamson', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Caesar Vance', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Cedric Kelly', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Charde Marshall', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Colleen Hurst', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Dai Rios', 'Andrew Mike', 'Develop', ''],
                ['Doris Wilder', 'John Doe', 'Design', 'btn-round'],
                ['Fiona Green', 'Alex Mike', 'Design', 'btn-simple'],
                ['Garrett Winters', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Gavin Cortez', 'Paul Dickens', 'Communication', ''],
                ['Gavin Joyce', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Gloria Little', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Haley Kennedy', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Herrod Chandler', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Hope Fuentes', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Howard Hatfield', 'Andrew Mike', 'Develop', ''],
                ['Jena Gaines', 'John Doe', 'Design', 'btn-round'],
                ['Jenette Caldwell', 'Alex Mike', 'Design', 'btn-simple'],
                ['Jennifer Chang', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Martena Mccray', 'Paul Dickens', 'Communication', ''],
                ['Michael Silva', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Michelle House', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Paul Byrd', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Prescott Bartlett', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Quinn Flynn', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Rhona Davidson', 'Andrew Mike', 'Develop', ''],
                ['Shou Itou', 'John Doe', 'Design', 'btn-round'],
                ['Sonya Frost', 'Alex Mike', 'Design', 'btn-simple'],
                ['Suki Burks', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Tatyana Fitzpatrick', 'Paul Dickens', 'Communication', ''],
                ['Tiger Nixon', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Timothy Mooney', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Unity Butler', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Vivian Harrell', 'Mike Monday', 'Marketing', 'btn-round'],
                ['Yuri Berry', 'Mike Monday', 'Marketing', 'btn-round']
            ]
        };
    }

    ngAfterViewInit() {
        $('#datatable').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Поиск',
            }

        });

        var table = $('#datatable').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            let $tr = $(this).closest('tr');

            var data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });
    }
}
