export default function checkDate() {

    console.log("existe en localStorage? ", localStorage.getItem('timeOfUpdate') ? true : false)
    const currentDateInMiliseconds = Date.now()
    const getLastTimeUpdated = () => {
        const lastDay = localStorage.getItem('timeOfUpdate')
        if (!lastDay) {
            localStorage.setItem('timeOfUpdate', currentDateInMiliseconds)
            return currentDateInMiliseconds
        }

        return lastDay
    }

    const lastTimeUpdated = getLastTimeUpdated()
        console.log('lastDay', lastTimeUpdated)
    const oneDayInMilisencods = 1000
    console.log(currentDateInMiliseconds - lastTimeUpdated, oneDayInMilisencods)
    const needToUpdate = true //(currentDateInMiliseconds - lastTimeUpdated) > oneDayInMilisencods;

    console.log('needUpdate:', needToUpdate)

      needToUpdate && localStorage.setItem('timeOfUpdate', currentDateInMiliseconds);

      return needToUpdate;
}