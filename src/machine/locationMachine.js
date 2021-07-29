import { createMachine, assign, sendParent } from 'xstate';

export const locationMachine = createMachine(
    {
        id: 'locationMachine',
        context: {
            city: undefined | String,
            street: undefined | String,
            secondTry: false
        },
        initial: 'form',
        states: {
            form: {
                type: 'parallel',
                states: {
                    inputCity: {
                        on: {
                            CITY_CHANGE: {
                                actions: assign({
                                    city: (_, event) => event.value
                                })
                            }
                        }
                    },
                    inputStreet: {
                        on: {
                            STREET_CHANGE: {
                                actions: assign({
                                    street: (_, event) => event.value
                                })
                            }
                        }
                    }
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
                    type: 'LOCATION_UPDATE'
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