import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
//const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

let history
if (process.env.NODE_ENV === 'test') {
    console.log('TEST', process.env.NODE_ENV)
    history = createMemoryHistory()
} else {
    console.log('dev', process.env.NODE_ENV)
    history = createHistory()
}


export default history
