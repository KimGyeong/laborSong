require('dotenv').config();
const express = require('express');
const router = express.Router();

const addSongOpenModal = require('../components/addSongOpenModal');
const giveSongOpenModal = require('../components/giveSongOpenModal');
const sendMessage = require('../components/sendMessage');

const token = process.env.BOT_TOKEN;

const actions = router.post(`/`, (req, res) => {
    const {trigger_id, user, actions, type, channel} = JSON.parse(req.body.payload);
    if (actions && actions[0].action_id.match(`add_song`)) {
        addSongOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match('give_song')) {
        giveSongOpenModal(trigger_id, token);
    } else if (type === 'view_submission') {
        const genre = JSON.parse(req.body.payload).view.state.values.songSelect.songValue.selected_option.value;
        sendMessage("테스트채널", genre, token);
        res.send({response_action:"clear"});
    }
});

module.exports = actions;