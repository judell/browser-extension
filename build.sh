rm x-extension.zip
make clean
make SETTINGS_FILE=settings/chrome-prod.json
cd build
zip -r ../x-extension.zip .
cd ..
