# 노동요 추천

## 함수 설명

```javascript
controller.hears(단어, 경로(봇한테 dm, 언급 등), (bot, message) => {
    bot.reply(형태, 보낼 내용)
})  
```

- direct_message : 봇에게 DM
- direct_mention : 직접 언급
- ambient : 그냥 채팅만 쳐도 됨

## 예시
```javascript
controller.hears(["헤헤"],["direct_message","direct_mention","mention","ambient"],function(bot,message) { bot.reply(message,'호호'); });



controller.hears(["덥다","더워","더워요"],["direct_message","direct_mention","mention","ambient"],function(bot,message) { bot.reply(message,'진짜 더워요'); });
```