import { createMachine, assign, spawn, send, sendParent } from 'xstate';
import { generalMachine } from './generalMachine';
import { Incident } from '../Incident'
import { locationMachine } from './locationMachine';


const saveValid = (context, _) => new Promise((resolve, reject) => {
    if (!!context.actIncident.title &&
        !!context.actIncident.type &&
        !!context.actIncident.incidentDate &&
        !!context.actIncident.state &&
        !!context.actIncident.priority &&
        !!context.actIncident.riskOfRecurrence &&
        !!context.actIncident.city) {
            return resolve();
        } else {
            return reject();
        }
});

export const incidentCreatorMachine = createMachine(
    {
        id: 'incidentCreatorMachine',
        initial: 'idle',
        context: {
            generalM: null,
            locationM: null,
            actIncident: null
        },
        states: {
            idle: {
                on: {
                    CREATE_NEW_INCIDENT: {
                        target: 'general',
                        actions: 'createNewIncident'
                    }
                }
            },
            general: {
                on: {
                    NEXT: 'location'
                }
            },
            location: {
                on: {
                    BACK: {
                        target: 'general',
                    }
                }
            },
            loading: {
                type: 'parallel',
                states: {
                    generalLoading: {
                        initial: 'pending',
                        states: {
                            pending: {
                                on: {
                                    GENERAL_UPDATE: {
                                        target: 'loaded',
                                        actions: [
                                            (context, event) => {
                                                context.actIncident.title = event.value.title;
                                                context.actIncident.type = event.value.type;
                                                context.actIncident.incidentDate = event.value.incidentDate;
                                                context.actIncident.state = event.value.state;
                                                context.actIncident.priority = event.value.priority;
                                                context.actIncident.riskOfRecurrence = event.value.riskOfRecurrence;
                                            }
                                        ]
                                    },
                                }
                            },
                            loaded: { 
                                type: 'final',
                            }
                        }
                    },
                    locationLoading: {
                        initial: 'pending',
                        states: {
                            pending: {
                                on: {
                                    LOCATION_UPDATE: {
                                        target: 'loaded',
                                        actions: [
                                            (context, event) => {
                                                context.actIncident.city = event.value.city;
                                            }
                                        ]
                                    },
                                }
                            },
                            loaded: { 
                                type: 'final',
                            }
                        }
                    }
                },
                onDone: 'saving'
            },
            saving: {
                invoke: {
                    id: 'saving',
                    src: saveValid,
                    onDone: {
                        target: 'finished', 
                        actions: sendParent((context, _) => ({
                            value: context,
                            type: 'SAVE_INCIDENT' 
                        })),
                    },
                    onError: {
                        target: 'general', 
                        actions: [
                            () => alert("Some required fields are empty!"),
                            send('TO_FORM', { to: (context) => context.locationM }),
                            send('TO_FORM', { to: (context) => context.generalM })
                        ],
                    }
                }
            },
            finished: {
                type: 'final'
            }
        },
        on: {
            SAVE: {
                target: '.loading',
                actions: [send('SAVE', { to: (context) => context.generalM }),
                          send('SAVE', { to: (context) => context.locationM})]
            },
            CANCEL: {
                target: '.finished',
                actions: sendParent('CANCEL'),
            },
            general: '.general',
            location: '.location'
        }
    },
    {
        actions: {
            createNewIncident: assign({
                actIncident: () => new Incident(),
                generalM: () => spawn(generalMachine),
                locationM: () => spawn(locationMachine)
            })
        }
    }
);
