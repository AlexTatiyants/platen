angular.module('platen.services').value('resources',
  {
    POST_DIRECTORY_PATH: 'posts',
    IMAGE_DIRECTORY_PATH: 'images',
    
    events: {
      PROCESSING_STARTED: 'processingStarted',
      PROCESSING_FINISHED: 'processingFinished'
    }
  }
);