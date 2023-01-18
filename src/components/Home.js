import checkDate from '../utils/checkDate';
import AppContext from '../context/contextProvider';
import React, { useState, useEffect, useContext } from 'react';
import { PodcastCard } from './PodcastCard';
import {withRouter} from 'react-router-dom';


const Navega = withRouter(PodcastCard);

const Home = () => {

    const
        needUpdateValue = checkDate(),
        storedPodcastList = JSON.parse(localStorage.getItem('podcastList')),
        iTunesUrl = encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'),
        state = useContext(AppContext);

        const defaultState = () => {
                return needUpdateValue ? [] : storedPodcastList
        };

    const [podCastList, setPodcastList] = useState(defaultState());

    const updateFetchedData = (data) => {

        const
            dataObject = JSON.parse(data.contents),
            list = dataObject.feed.entry;

        setPodcastList(list);
        localStorage.setItem('podcastList', JSON.stringify(list));
    };

    useEffect( () => {
        state.handleLoader(false);
    }, []);

    useEffect(() => {
        console.log("need to update? ", needUpdateValue);

        if(needUpdateValue) {

            fetch(`https://api.allorigins.win/get?url=${iTunesUrl}`)
                    .then(response => {
                      if (response.ok) return response.json();
                      throw new Error('KO. Error de red')
                    })
                    .then(data => {
                        updateFetchedData(data);
                    });
            console.log("FETCHING DATA")
        }
    });

    return (
        <div id="home">
            <div id="buscador">
                <input onChange={(e) => state.handleFilter(e)} type="text" placeholder="filtrar podcast"/>
            </div>

            <ul id="listado">
                {
                    podCastList.filter((podcastInFilter) => {
                        const
                            title = podcastInFilter['im:name'].label.trim().toLowerCase(),
                            author = podcastInFilter['im:artist'].label.trim().toLowerCase();

                        return title.indexOf(state.filterQuery) > -1 || author.indexOf(state.filterQuery) > -1
                    }).map( (podcast) => {
                        const id = podcast.id.attributes['im:id'];
                        return (
                            <Navega key={id} podcast={podcast}>click aqui</Navega>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export {Home}