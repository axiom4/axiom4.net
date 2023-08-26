from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Page


class PageTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.create_user(
            username="testuser",
            email="test@email.com",
            password="secret",
        )

        cls.page = Page.objects.create(
            author=cls.user,
            title="A good title",
            body="Nice body content",
        )

    def test_post_model(self):
        self.assertEqual(self.page.author.username, "testuser")
        self.assertEqual(self.page.title, "A good title")
        self.assertEqual(self.page.body, "Nice body content")
        self.assertEqual(str(self.page), "A good title")
