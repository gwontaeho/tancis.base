@REM remove .git
rm -rf .git
RD /S /Q .git

@REM remove ./src/comn
rm -rf ./src/comn
RD /S /Q "./src/comn"

@REM init git
git init


@REM add submodule
git submodule add --name comn http://119.204.73.146/tancis/front/front.com.libts.git src/comn


@REM copy root, src
xcopy ".\src\comn\.root" ".\" /E /Y
xcopy ".\src\comn\.src" ".\src" /E /Y


@REM package install
npm install


pause
