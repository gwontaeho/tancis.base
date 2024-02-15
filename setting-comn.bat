@REM submodule init, update
git submodule init
git submodule update --remote --force


@REM copy root, src
xcopy ".\src\comn\.root" ".\" /E /Y
xcopy ".\src\comn\.src" ".\src" /E /Y


npm npm install --legacy-peer-deps


