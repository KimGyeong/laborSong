require('dotenv').config();
const express = require('express');
const router = express.Router();

const addStudyOpenModal = require('../components/addStudyOpenModal');
const giveStudyOpenModal = require('../components/giveStudyOpenModal');
const sendAddStudyRequest = require('../components/sendAddStudyRequest');
const sendGiveStudyMessage = require('../components/sendGiveStudyMessage');

const token = process.env.BOT_TOKEN;

const actions = router.post(`/`, (req, res) => {
    const PAYLOAD_JSON = JSON.parse(req.body.payload);
    const {trigger_id, user, actions, type, channel} = PAYLOAD_JSON;

    if (actions && actions[0].action_id.match(`add_study`)) {
        addStudyOpenModal(trigger_id, token);
    } else if (actions && actions[0].action_id.match('give_study')) {
        giveStudyOpenModal(trigger_id, token);
    } else if (JSON.parse(req.body.payload).view.blocks[0].block_id === 'study_select_block' && type === 'view_submission') {
        const level = PAYLOAD_JSON
            .view
            .state
            .values
            .study_select_block
            .study_select_value
            .selected_option
            .value;

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
            .add_study_link_value_block
            .add_one_sentence_review_value
            .value;

        sendAddStudyRequest(level, title, link);
        res.send({response_action: "clear"});
    }
});

module.exports = actions;