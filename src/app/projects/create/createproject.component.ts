import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user-model';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateUserRequest} from '../../models/update-user-request';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ProjectModel} from '../../models/project-model';

const dummyUser = new ProjectModel();
const dummyRequest = new UpdateUserRequest();

declare var $: any;
declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    moduleId: module.id,
    selector: 'create-project-cmp',
    templateUrl: 'createproject.component.html'
})

export class CreateProjectComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;
    Project: ProjectModel = dummyUser;
    UserReq: UpdateUserRequest = dummyRequest;
    projectForm: FormGroup = new FormGroup({
        'name': new FormControl(this.Project.name, [
            Validators.minLength(2), Validators.required]),
        'description': new FormControl(this.Project.description)

    });

    constructor(private userService: UserService, private ref: ChangeDetectorRef, private notificationsService: NotificationsService) {
    }

    onSubmit() {
        if (this.projectForm.valid) {
            console.log(this.projectForm.value);
        }
    }

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['ФИО', 'Действия'],
            footerRow: ['Название', 'Действия'],
            dataRows: [
                ['Airi Satou', ''],
                ['Angelica Ramos', 'btn-round'],
                ['Ashton Cox', 'btn-simple'],
                ['Bradley Greer', 'btn-round'],
                ['Brenden Wagner', ''],
                ['Brielle Williamson', 'btn-round'],
                ['Caesar Vance', 'btn-round'],
                ['Cedric Kelly', 'btn-round'],
                ['Charde Marshall', 'btn-round'],
                ['Colleen Hurst', 'btn-round'],
                ['Dai Rios', ''],
                ['Doris Wilder', 'btn-round'],
                ['Fiona Green', 'btn-simple'],
                ['Garrett Winters', 'btn-round'],
                ['Gavin Cortez', ''],
                ['Gavin Joyce', 'btn-round'],
                ['Gloria Little', 'btn-round'],
                ['Haley Kennedy', 'btn-round'],
                ['Herrod Chandler', 'btn-round'],
                ['Hope Fuentes', 'btn-round'],
                ['Howard Hatfield', ''],
                ['Jena Gaines', 'btn-round'],
                ['Jenette Caldwell', 'btn-simple'],
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
