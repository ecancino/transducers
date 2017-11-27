import { into, map, filter, compose, merge, identity  } from 'ramda'
import { getTime } from 'date-fns'

import { setAge, celebrate, isFemale, isMale, formatBirthday } from '.'

const adriana = { firstName: 'Adriana', lastName: 'Zubieta Zavala', birthday: getTime('04/02/1977'), gender: 'F' }
const eduardo = { firstName: 'Eduardo', lastName: 'Cancino Zarate', birthday: getTime('12/28/1977'), gender: 'M' }
let pinguinos = [ adriana, eduardo ]

const transduce = isGender =>
  compose(map(compose(formatBirthday, celebrate, setAge)), filter(isGender))

const expectedAdriana = merge(adriana, { age: 41, birthday: '04/02/1977' })
const expectedEduardo = merge(eduardo, { age: 40, birthday: '12/28/1977' })

it('Transduces Adriana', () =>
  expect(into([], transduce(isFemale), pinguinos)).toEqual([ expectedAdriana ])
)

it('Transduces Eduardo', () =>
  expect(into([], transduce(isMale), pinguinos)).toEqual([ expectedEduardo ])
)

it('Transduces Pinguinos', () =>
  expect(into([], transduce(identity), pinguinos)).toEqual([ expectedAdriana, expectedEduardo ])
)
