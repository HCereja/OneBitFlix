import { EpisodeInstance } from "../models/Episode";

export function filterEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);

      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList;
    }

    const newList = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    newList.push(episode);

    return newList;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}
