# book-personalize-api

- book personalize api server

## Playing locally

로컬에서 띄우기 위해 준비해야 할 것은 다음과 같습니다.

- Docker Image
- .env 파일

도커 이미지 빌드

```shell script
docker build . -t munchkin:latest
```

.env 파일은 .env.example 파일을 복사하세요.

```shell script
cp .env.example .env
```

이제 준비가 되었습니다. 다음 명령어를 타이핑 하세요.

````shell script
docker-compose up
````
