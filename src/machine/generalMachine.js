import { createMachine, assign, sendParent } from 'xstate';

export const generalMachine = createMachine(
    {
        id: 'generalMachine',
        context: {
            type: undefined | String,
            reportedBy: undefined | String,
            contactNumber: undefined | String,
            incidentDate: undefined | String,
            title: undefined | String,
            state: undefined | String,
            priority: undefined | String,
            riskOfRecurrence: undefined | String,
            secondTry: false
        },
        initial: 'form',
        states: {
            form: {
                type: 'parallel',
                states: {
                    inputType: {
                        on: {
                            TYPE_CHANGE: {
                                actions: assign({
                                    type: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputReportedBy: {
                        on: {
                            REPORTED_BY_CHANGE: {
                                actions: assign({
                                    reportedBy: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputContactNumber: {
                        on: {
                            CONTACT_NUMBER_CHANGE: {
                                actions: assign({
                                    contactNumber: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputIncidentDate: {
                        on: {
                            INCIDENT_DATE_CHANGE: {
                                actions: assign({
                                    incidentDate: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputTitle: {
                        on: {
                            TITLE_CHANGE: {
                                actions: [assign({
                                    title: (_, event) => event.value
                                })]
                            }
                        }
                    },
                    inputState: {
                        on: {
                            STATE_CHANGE: {
                                actions: assign({
                                    state: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputPriority: {
                        on: {
                            PRIORITY_CHANGE: {
                                actions: assign({
                                    priority: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputRiskOfRecurrence: {
                        on: {
                            RISK_OF_RECURRENCE: {
                                actions: assign({
                                    riskOfRecurrence: (_, event) => event.value
                                })
                            }
                        }
                    },
                },
                on: {
                    SAVE: {
                        target: 'saved', 
                    }
                }
            },
            saved: {
                entry: sendParent((context, _) => ({
                    value: context,
                    type: 'GENERAL_UPDATE'
                })),
                on: {
                    TO_FORM: {
                        target: 'form',
                        actions: assign({
                            secondTry: () => true
                        })
                    }
                }
            }
        }
    }
);