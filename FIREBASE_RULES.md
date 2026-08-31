# Firestore Rules

Use these rules in Firebase so only the single admin account can edit the portfolio content:

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/portfolio {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "nirupampaldev@gmail.com";
    }
  }
}
```

# Storage Rules

The rebuilt admin uploads hero photos, project covers, achievements, and blog images to the `portfolio/` folder in Firebase Storage. Publish these Storage rules as well:

```txt
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "nirupampaldev@gmail.com"
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

Also create the admin user in Firebase Authentication:

- Email: `nirupampaldev@gmail.com`
- Password: your chosen admin password

The frontend login screen is locked to that email and uses Firebase Authentication for the password check.
