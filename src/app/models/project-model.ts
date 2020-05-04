import {StageModel} from './stage-model';

export class ProjectModel {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    participants: string[];
    profiles: string[];
    curator: string;
    stages: StageModel[];
}
