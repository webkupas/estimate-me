import {db} from '../firebase'
import {updateUserRelatedWorkspaces} from './users'

/**
 * Remove workspace
 *
 * @param  {string} workspaceID
 */
export const removeWorkspace = (workspaceID) => {
  let wspaceDocRef = db.collection('workspaces').doc(workspaceID)
  return new Promise((resolve, reject) => {
    wspaceDocRef.get()
      .then(doc => {
        if (doc.exists && doc.data()) {
          let followersList = doc.data().superadmin ? [doc.data().superadmin] : []
          if (doc.data().followers && Array.isArray(doc.data().followers) && doc.data().followers.length) {
            followersList = followersList.concat(doc.data().followers)
          }
          followersList.forEach(elem => {
            updateUserRelatedWorkspaces(elem, workspaceID, false)
          })
          wspaceDocRef.delete()
            .then(() => {
              console.log('Workspce succesfully removed!')
              resolve()
            })
            .catch(error => console.error('Error with workspace removing: ', error))
        }
      })
      .catch(error => console.error('Error with workspace removing: ', error))
  })
}
