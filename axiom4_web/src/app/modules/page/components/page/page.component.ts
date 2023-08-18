import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, RetrievePageRequestParams } from 'src/app/modules/core/api/v1';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }
  ngOnInit(): void {
    const tag = this.route.snapshot.paramMap.get('tag');
    if (tag) {
      const params: RetrievePageRequestParams = {
        tag: tag
      }
      this.blogService.retrievePage(params).subscribe({
        next: (page) => {
          console.log(page)
        },
        error: (error) => {
          this.router.navigate(['/404'])
          console.log(error)
        }
      })
    }
  }
}
