import {db} from '../firebase'
import uniq from 'lodash/uniq'

/**
 * Update User's Related Workspaces List in DB
 *
 * @param  {string} userID - user ID
 * @param  {string} workspace - workspace ID
 * @param  {boolean} toAdd - true - add new workspace in user's related workspaces list;
 *                           false - remove workspace from user's related workspaces list
 */
export const updateUserRelatedWorkspaces = (userID, workspace, toAdd = true) => {
  const userDocRef = db.collection('users').doc(userID)
  return userDocRef.get()
    .then(doc => {
      if (doc.exists) {
        let relatedWorkspaces = doc.data().workspaces
        let lastWorspace = doc.data().lastWorkspace
        let newRelatedWorkspacesList = []

        if (toAdd) { // add new workspace
          if (relatedWorkspaces && Array.isArray(relatedWorkspaces) && relatedWorkspaces.length) {
            newRelatedWorkspacesList = uniq(relatedWorkspaces, [workspace])
          } else {
            newRelatedWorkspacesList.push(workspace)
          }
        } else if (!toAdd) { // remove workspace
          if (relatedWorkspaces && Array.isArray(relatedWorkspaces) && relatedWorkspaces.length) {
            newRelatedWorkspacesList = newRelatedWorkspacesList.filter(elem => elem !== workspace)
          }
          if (lastWorspace === workspace) updateLastVisitedWorkspace(userID, '')
        }

        return newRelatedWorkspacesList
      }
    })
    .then(newRelatedWorkspacesList => {
      return userDocRef.update({workspaces: newRelatedWorkspacesList})
                .then(() => console.log('User\'s related workspaces successfully updated'))
                .catch(error => console.log('Error with updating user\'s related workspaces list: ', error))
    })
    .catch(error => console.log('Error with updating user\'s related workspaces list ', error))
}

/**
 * Update users's last visited workspace
 *
 * @param  {string} userID - user ID
 * @param  {string} workspaceID - workspace ID - might be empty string
 */
export const updateLastVisitedWorkspace = (userID, workspaceID) => {
  db.collection('users')
    .doc(userID)
    .update({
      'lastWorkspace': workspaceID
    })
    .then(() => { console.log('Last visited workspace updated for current user') })
    .catch(error => console.error('Error updating document', error))
}
