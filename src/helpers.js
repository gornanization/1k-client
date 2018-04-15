import * as _ from 'lodash'
import { toCard, Suit, getPointsByCard, toCardPattern } from '../../1k/dist/src/index'

export function amISittingHere ({first, second, third}, name) {
    return [first, second, third].includes(name)
}

export function everyoneIsSitting ({first, second, third}) {
    return !!(first && second && third)
}

export function isSuit (suit) {
    return card => card.suit === suit
}

export function sortCards (cards) {
    cards = cards.map(toCard)

    function getSortedCardsBySuit (suit) {
        return _.chain(cards)
            .filter(isSuit(suit))
            .sortBy([card => getPointsByCard(card)])
            .reverse()
            .map(toCardPattern)
            .value()
    }

    return [
        ...getSortedCardsBySuit(Suit.Heart),
        ...getSortedCardsBySuit(Suit.Diamond),
        ...getSortedCardsBySuit(Suit.Club),
        ...getSortedCardsBySuit(Suit.Spade)
    ]
}
