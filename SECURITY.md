# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Patch: CVE-2024-XXXXX (Mock)

### Summary
This hotfix addresses a simulated security vulnerability in the authentication flow. The patch ensures that all session tokens are properly validated before granting access to protected API endpoints.

### Affected Components
- `backend/app.py`: `/analyze` endpoint
- `frontend/middleware.ts`: Session validation

### Patch Details

**Issue**: Insufficient validation of JWT tokens could allow malformed tokens to bypass authentication checks under specific edge cases.

**Resolution**: 
1. Added strict JWT signature verification
2. Implemented token expiration validation
3. Added rate limiting on authentication endpoints
4. Enhanced logging for failed authentication attempts

### Implementation

```python
# Before (vulnerable)
def validate_token(token):
    return jwt.decode(token, options={"verify_signature": False})

# After (patched)
def validate_token(token):
    return jwt.decode(
        token,
        key=settings.JWT_SECRET,
        algorithms=["HS256"],
        options={"verify_exp": True, "verify_signature": True}
    )
```

### Mitigation Steps
1. Update to the latest version immediately
2. Rotate all existing session tokens
3. Review access logs for suspicious activity

### Timeline
- **Discovered**: 2026-01-16
- **Patched**: 2026-01-16
- **Disclosed**: 2026-01-17 (after patch deployment)

## Reporting a Vulnerability

If you discover a security vulnerability, please report it via:

1. **Email**: security@nutriguard.io
2. **GitHub Security Advisory**: [Create Advisory](https://github.com/thezaynahmed/nutriguard-clinical-ops/security/advisories/new)

We will respond within 48 hours and work with you to understand and address the issue.

### Responsible Disclosure

We kindly ask that you:
- Give us reasonable time to fix the issue before public disclosure
- Do not access or modify data that does not belong to you
- Act in good faith to avoid privacy violations

## Security Best Practices

### For Developers
- Never commit secrets to version control
- Use environment variables for all sensitive configuration
- Keep dependencies updated (`npm audit`, `pip-audit`)
- Enable 2FA on all production accounts

### For Operators
- Enable Cloud Armor WAF in production
- Use VPC Service Controls for data isolation
- Implement least-privilege IAM policies
- Enable audit logging on all GCP resources
