import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs'

const debuggerOn = true

Observable.prototype.debug = function(message: string) {
  return this.do(
    next => {
      if (debuggerOn) {
        console.log('DEBUG >>> ' + message, next)
      }
    },
    err => {
      if (debuggerOn) {
        console.error('ERROR >>> ', message, err)
      }
    },
    () => {
      if (debuggerOn) {
        console.log('Completed.')
      }
    }
  )
}
