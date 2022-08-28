

export default anims => {
    anims.create({
        key: 'crusheranims',
        frames: anims.generateFrameNumbers('crusher', {
          start: 0,
          end: 3,
        }),
        frameRate: 5,
        repeat: 1,
      })
}