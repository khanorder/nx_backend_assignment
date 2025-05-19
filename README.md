# 이벤트 / 보상 관리 플랫폼 구축

## 프로젝트 폴더 구조
```
/my-monorepo
├── apps/
│   ├── auth-server/                    # 인증 서버
│   │   ├── src/
│   │   ├── config.development.yaml     # 개발환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   │   ├── config.yaml                 # 배포환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   │   ├── private.pem                 # jwt 생성용 비공개 키
│   │   └── public.pem                  # jwt 검증용 공개 키
│   ├── event-server/                   # 이벤트 서버
│   │   ├── src/
│   │   ├── config.development.yaml     # 개발환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   │   └── config.yaml                 # 배포환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   └── gateway-server/         # 게이트웨이 서버
│   │   ├── src/
│   │   ├── config.development.yaml     # 개발환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   │   ├── config.yaml                 # 배포환경 설정 파일 (config.dummy.yaml 파일 복사해서 사용)
│   │   ├── private.pem         # jwt 생성용 비공개 키
│   │   └── public.pem          # jwt 검증용 공개 키
├── libs/
│   ├── auth/                   # 인증 라이브러리
│   │   └── src/
│   ├── auth-jwt/               # 인증 jwt 관련 라이브러리
│   │   └── src/
│   ├── common/                 # 공통 라이브러리
│   │   └── src/
│   └── database/               # 데이터베이스 라이브러리
│       └── src/
│           ├── schemas/        # 모델 스키마 객체
│           ├── seeds/          # 더미 데이터
│           └── services/       # 데이터베이스 비즈니스 로직
└── README.md
```

## 데이터베이스(mongodb) docker container 초기화
  - Windows 환경에 wsl 및 docker desktop 설치 필요
  - 프로젝트 파일 내 reset-db.bat 파일 실행
  - reset-db.bat 파일 항목
    - MONGO_ROOT_USER: 2번줄 아이디 설정
    - MONGO_ROOT_PASSWORD: 3번줄 비밀번호 설정
    - MONGO_PORT: 4번줄 호스트 로컬(작업pc)에서 사용할 mongodb port
  - 기존 컨테이너가 실행중인 경우 기존 컨테이너 삭제 후 새로 생성