import converge from 'ramda/src/converge'
import identity from 'ramda/src/identity'
import compose from 'ramda/src/compose'
import propEq from 'ramda/src/propEq'
import partialRight from 'ramda/src/partialRight'
import lensProp from 'ramda/src/lensProp'
import view from 'ramda/src/view'
import over from 'ramda/src/over'
import set from 'ramda/src/set'
import add from 'ramda/src/add'
import format from 'date-fns/fp/format'
import differenceInYears from 'date-fns/fp/differenceInYears'

const lBirthday = lensProp('birthday')
const lAge = lensProp('age')

const yearsIn = partialRight(differenceInYears, [ Date.now() ])
const getAge = compose(view(lBirthday), over(lBirthday, yearsIn))

export const setAge = converge(set(lAge), [ getAge, identity ])
export const celebrate = over(lAge, add(1))
export const isFemale = propEq('gender', 'F')
export const isMale = propEq('gender', 'M')
export const formatBirthday = over(lBirthday, format('MM/DD/YYYY'))
