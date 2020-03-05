require('dotenv').config();
const express = require('express');
const router = express.Router();

const addSongOpenModal = require('../components/addSongOpenModal');
const giveSongOpenModal = require('../components/giveSongOpenModal');
const sendMessage = require('../components/sendMessage');
const sendAddSongRequest = require('../components/sendAddSongRequest');
const token = process.env.BOT_TOKEN;

const actions = router.post(`/`, (req, res) => {
    const PAYLOAD_JSON = JSON.parse(req.body.payload);
    const {trigger_id, user, actions, type, channel} = PAYLOAD_JSON;

    if (actions && actions[0].action_id.match(`add_song`)) {
        addSongOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match('give_song')) {
        giveSongOpenModal(trigger_id, token);
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'songSelect' && type === 'view_submission') {
        const genre = PAYLOAD_JSON
            .view
            .state
            .values
            .songSelect
            .songValue
            .selected_option
            .value;

        sendMessage("테스트채널", genre, token);
        res.send({response_action: "clear"});
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'add_song_link_block' && type === 'view_submission') {
        const link = PAYLOAD_JSON
            .view
            .state
            .values
            .add_song_link_block
            .add_song_link_value
            .value;
        const one_sentence_review = PAYLOAD_JSON
            .view.state
            .values
            .add_one_sentence_review_block
            .add_one_sentence_review_value
            .value;
        const genre = PAYLOAD_JSON
            .view
            .state
            .values
            .add_song_genre_selcet_block
            .song_genre_value
            .selected_option
            .value;

        sendAddSongRequest(link, one_sentence_review, genre);
        res.send({response_action: "clear"});
    }
});

module.exports = actions;