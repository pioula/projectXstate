import { createMachine, assign, spawn, send } from 'xstate';
import { incidentCreatorMachine } from './incidentCreatorMachine';



export const incidentsMachine = createMachine(
    {
        id: 'incidentsMachine',
        initial: 'incidentsList',
        context: {
            incidents: [],
            incidentCreatorM: null
        },
        states: {
            incidentsList: {
                entry: assign({
                    incidentCreatorM: () => spawn(incidentCreatorMachine, { sync: true })
                }),
                on: {
                    CREATE: {
                        target: 'creatingIncident',
                    }
                }
            }, 
            creatingIncident: {
                entry: send('CREATE_NEW_INCIDENT', { to: (context) => context.incidentCreatorM }),
                on: {
                    CANCEL: {
                        target: 'incidentsList',
                    },
                    SAVE_INCIDENT: {
                        target: 'incidentsList',
                        actions: (context, event) => context.incidents.push(event.value.actIncident)
                    }
                }
            },
        }
    }
);