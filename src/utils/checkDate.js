export default function checkDate() {

    console.log("existe en localStorage? ", localStorage.getItem('timeOfUpdate') ? true : false)
    const
      currentDateInMiliseconds = Date.now(),
      lastTimeUpdated = localStorage.getItem('timeOfUpdate') || localStorage.setItem('timeOfUpdate', currentDateInMiliseconds),
      oneDayInMilisencods = 1000 * 60 * 60 * 24,
      needToUpdate = (currentDateInMiliseconds - lastTimeUpdated) > oneDayInMilisencods;

      needToUpdate && localStorage.setItem('timeOfUpdate', currentDateInMiliseconds);

      return needToUpdate;
}