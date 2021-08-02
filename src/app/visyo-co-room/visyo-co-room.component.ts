import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 }  from 'uuid';

declare const Peer: new (arg0: string, arg1: { host: string; port: number; }) => any;

interface VideoElement {
  muted: boolean;
  Streaming: MediaStream;
  userId: string;
}
@Component({
  selector: 'app-visyo-co-room',
  templateUrl: './visyo-co-room.component.html',
  styleUrls: ['./visyo-co-room.component.css']
})
export class VisyoCoRoomComponent implements OnInit {
  currentUserId:string = uuidv4();
  videos: VideoElement[] = [];

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
  ) { }

  ngOnInit() {
    console.log(`Initialize Peer with id ${this.currentUserId}`);
    const myPeer = new Peer(this.currentUserId, {
      host: '/',
      port: 3001,
    });

    this.route.params.subscribe((params) => {
      console.log(params);

      myPeer.on('open', (userId: any) => {
        this.socket.emit('join-room', params.roomId, userId);
      });
    });

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
      .catch((err) => {
        console.error('[Error] Not able to retrieve user media:', err);
        return null;
      })
      .then((stream: MediaStream | null) => {
        if (stream) {
          this.addMyVideo(stream);
        }

        myPeer.on('call', (call: { answer: (arg0: MediaStream | null) => void; on: (arg0: string, arg1: { (otherUserVideoStream: MediaStream): void; (err: any): void; }) => void; metadata: { userId: string; }; }) => {
          console.log('receiving call...', call);
          call.answer(stream);

          call.on('stream', (otherUserVideoStream: MediaStream) => {
            console.log('receiving other stream', otherUserVideoStream);

            this.addOtherUserVideo(call.metadata.userId, otherUserVideoStream);
          });

          call.on('error', (err: any) => {
            console.error(err);
          })
        });

        this.socket.on('user-connected', (userId: string) => {
          console.log('Receiving user-connected event', `Calling ${userId}`);

          // Let some time for new peers to be able to answer
          setTimeout(() => {
            const call = myPeer.call(userId, stream, {
              metadata: { userId: this.currentUserId },
            });
            call.on('stream', (otherUserVideoStream: MediaStream) => {
              console.log('receiving other user stream after his connection');
              this.addOtherUserVideo(userId, otherUserVideoStream);
            });

            call.on('close', () => {
              this.videos = this.videos.filter((video) => video.userId !== userId);
            });
          }, 1000);
        });
      });

    this.socket.on('user-disconnected', (userId: string) => {
      console.log(`receiving user-disconnected event from ${userId}`)
      this.videos = this.videos.filter(video => video.userId !== userId);
    });
  }

  addMyVideo(stream: MediaStream) {
    this.videos.push({
      muted: true,
      Streaming: stream,
      userId: this.currentUserId,
    });
  }

  addOtherUserVideo(userId: string, stream: MediaStream) {
    const alreadyExisting = this.videos.some(video => video.userId === userId);
    if (alreadyExisting) {
      console.log(this.videos, userId);
      return;
    }
    this.videos.push({
      muted: false,
      Streaming: stream,
      userId,
    });
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

}
