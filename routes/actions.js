require('dotenv').config();
const express = require('express');
const router = express.Router();

const addSongOpenModal = require('../components/addSongOpenModal');
const giveSongOpenModal = require('../components/giveSongOpenModal');
const sendMessage = require('../components/sendMessage');
const sendAddSongRequest = require('../components/sendAddSongRequest');
const categoryCheck = require('../utils/youtubeApi');
const addStudyOpenModal = require('../components/addStudyOpenModal');
const giveStudyOpenModal = require('../components/giveStudyOpenModal');
const sendAddStudyRequest = require('../components/sendAddStudyRequest');
const sendGiveStudyMessage = require('../components/sendGiveStudyMessage');
const getYoutubeId = require('get-youtube-id');

const token = process.env.BOT_TOKEN;

const actions = router.post(`/`, (req, res) => {
    const PAYLOAD_JSON = JSON.parse(req.body.payload);
    const {trigger_id, user, actions, type} = PAYLOAD_JSON;
    const urlRegex = new RegExp(/(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi);

    if (actions && actions[0].action_id.match(`add_song`)) {
        addSongOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match('give_song')) {
        giveSongOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match(`add_study`)) {
        addStudyOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match('give_study')) {
        giveStudyOpenModal(trigger_id, token);
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'songSelect' && type === 'view_submission') {
        const genre = PAYLOAD_JSON
            .view
            .state
            .values
            .songSelect
            .songValue
            .selected_option
            .value;

        sendMessage(user.id, genre, token);
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

        let youtubeId = getYoutubeId(link);

        console.log(youtubeId);

        categoryCheck(youtubeId)
            .then(function (result) {
                if (!urlRegex.test(link) || result) {
                    const modal = {
                        "response_action": "errors",
                        "errors": {
                            "add_song_link_block": "잘못된 링크입니다."
                        }
                    };
                    res.send(modal);
                } else {
                    sendAddSongRequest(link, one_sentence_review, genre);
                    res.send({response_action: "clear"});
                }
            });
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'study_select_block' && type === 'view_submission') {
        const level = JSON.stringify(PAYLOAD_JSON
            .view
            .state
            .values
            .study_select_block
            .study_select_value
            .selected_option
            .value);

        console.log(level);

        sendGiveStudyMessage("테스트채널", level, token);
        res.send({response_action: "clear"});
        // TODO : type인자 확인
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'add_study_block' && type === 'view_submission') {
        const level = PAYLOAD_JSON
            .view
            .state
            .values
            .add_study_level_selcet_block
            .study_level_value
            .selected_option
            .value;
        const title = PAYLOAD_JSON
            .view.state
            .values
            .add_study_title_value_block
            .add_study_title_value
            .value;
        const link = PAYLOAD_JSON
            .view
            .state
            .values
            .add_study_block
            .add_song_link_value
            .value;

        sendAddStudyRequest(level, title, link);
        res.send({response_action: "clear"});
    }
});

module.exports = actions;