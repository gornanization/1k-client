import * as _ from 'lodash'

export function amISittingHere({first, second, third}, name) {
    return [first, second, third].includes(name);
}

export function everyoneIsSitting({first, second, third}) {
    return !!(first && second && third);
}