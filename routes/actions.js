require('dotenv').config();
const express = require('express');
const router = express.Router();

const addSongOpenModal = require('../components/addSongOpenModal');
const giveSongOpenModal = require('../components/giveSongOpenModal');
const sendMessage = require('../components/sendMessage');
const sendAddSongRequest = require('../components/sendAddSongRequest');
const token = process.env.BOT_TOKEN;

const actions = router.post(`/`, (req, res) => {
    const {trigger_id, user, actions, type, channel} = JSON.parse(req.body.payload);
    if (actions && actions[0].action_id.match(`add_song`)) {
        if(type === 'view_submission') {
            console.log(JSON.parse(req.body.payload).toString());
            const link = JSON.parse(req.body.payload)
                                                .view
                                                .state
                                                .values
                                                .add_song_link_block
                                                .add_song_link_value
                                                .value;
            const one_sentence_review = JSON.parse(req.body.payload)
                                                            .view.state
                                                            .values
                                                            .add_one_sentence_review_block
                                                            .add_one_sentence_review_value
                                                            .value;
            const genre = JSON.parse(req.body.payload)
                                                .view
                                                .state
                                                .values
                                                .add_song_genre_selcet_block
                                                .song_genre_value
                                                .selected_option
                                                .value;
            console.log(link);
            console.log(one_sentence_review);
            console.log(genre);
            sendAddSongRequest(link, one_sentence_review, genre);
            res.send({response_action:"clear"});
        } else {
            addSongOpenModal(trigger_id, token);
        }
    } else if (actions && actions[0].action_id.match('give_song')) {
        if(type === 'view_submission') {
            const genre = JSON.parse(req.body.payload).view.state.values.songSelect.songValue.selected_option.value;
            sendMessage("테스트채널", genre, token);
            res.send({response_action:"clear"});
        } else {
            giveSongOpenModal(trigger_id, token);
        }
    }
});

module.exports = actions;