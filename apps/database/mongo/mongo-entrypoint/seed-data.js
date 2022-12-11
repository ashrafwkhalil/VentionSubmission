print("===============JAVASCRIPT===============")
print("Count of rows in ventionsubmission collection: " + db.ventionsubmission.count())

db.ventionsubmission.insert({ message: "Testing data is preserved on docker-compose down and docker-compose-up" })

print("===============AFTER JS INSERT==========")
print("Count of rows in ventionsubmission collection: " + db.ventionsubmission.count())

data = db.ventionsubmission.find()
while (data.hasNext()) {
  printjson(data.next())
}
